package com.sk.grip.controller;

import com.sk.grip.entity.QuestionEntity;
import com.sk.grip.entity.ReplyEntity;
import com.sk.grip.repo.QuestionRepo;
import com.sk.grip.repo.ReplyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
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
    public ResponseEntity<List<QuestionEntity>> fetchAllQuestion () {
        List<QuestionEntity> ques =  questionRepo.findAll();
        if (ques.isEmpty()) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(ques, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add-reply")
    public ResponseEntity<QuestionEntity> addReply (@RequestParam (name = "question") int qid, @RequestBody ReplyEntity reply) {

        QuestionEntity question = questionRepo.findByqId(qid);
        List<ReplyEntity> replyEntities =  question.getReplies();
        replyEntities.add(reply);
        question = questionRepo.saveAndFlush(question);
        return  new ResponseEntity<>(question, HttpStatus.OK);
    }

    @PostMapping("/add-question")
    public ResponseEntity<QuestionEntity> addQuestion (@RequestBody QuestionEntity question) {
        List<ReplyEntity> replyEntities = question.getReplies();
        if (replyEntities == null) {
            replyEntities = Collections.emptyList();
        }
        question = questionRepo.save(question);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

}
