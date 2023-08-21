package com.sk.grip.controller;

import com.sk.grip.entity.QuestionEntity;
import com.sk.grip.entity.ReplyEntity;
import com.sk.grip.model.GripResponse;
import com.sk.grip.model.QuestionModel;
import com.sk.grip.repo.QuestionRepo;
import com.sk.grip.repo.ReplyRepo;
import com.sk.grip.util.GripConstants;
import com.sk.grip.util.GripUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class QuestionController {

    @Autowired
    QuestionRepo questionRepo;

    @Autowired
    ReplyRepo replyRepo;

    @GetMapping("/test")
    public String test() {
        return "Api working";
    }

    @GetMapping("/all-question")
    public ResponseEntity<GripResponse> fetchAllQuestion () {
        List<QuestionEntity> ques =  questionRepo.findAll();
        if (ques.isEmpty()) {

            GripResponse response = new GripResponse(404, GripConstants.RESPONSE_FAILED, Collections.emptyList());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            ques = ques.stream().sorted( (x,y) -> y.getQId().compareTo(x.getQId())  ).collect(Collectors.toList());
            List<QuestionModel> models = QuestionModel.of(ques);
            GripResponse response = new GripResponse(200, GripConstants.RESPONSE_SUCCESS, models);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PostMapping("/add-reply")
    public ResponseEntity<GripResponse> addReply (@RequestParam (name = "question") int qid, @RequestBody ReplyEntity reply) {
        System.out.println(reply);
        try {
            if (StringUtils.isBlank(reply.getReplyTime())) {
                reply.setReplyTime(GripUtil.convertDate(new Date()));
            }
            reply.setReplyLike(0);
            reply.setReplyDislike(0);

            QuestionEntity question = questionRepo.findByqId(qid);
            List<ReplyEntity> replyEntities = question.getReplies();
            replyEntities.add(reply);
            question = questionRepo.saveAndFlush(question);
            GripResponse response = new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "Reply Submitted");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(  new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()) , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add-question")
    public ResponseEntity<GripResponse> addQuestion (@RequestBody QuestionEntity question) {
        try {
            if (StringUtils.isBlank(question.getQTime())) {
                question.setQTime(GripUtil.convertDate(new Date()));
            }
            List<ReplyEntity> replyEntities = question.getReplies();
            if (replyEntities == null) {
                replyEntities = Collections.emptyList();
            }
            question = questionRepo.save(question);
            GripResponse res = new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "Question Submitted");
            return new ResponseEntity<>(res, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(  new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()) , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
