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
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class QuestionController {

    public final static Logger logger = LogManager.getLogger(QuestionController.class);

    @Autowired
    HttpServletRequest request;

    @Autowired
    QuestionRepo questionRepo;

    @Autowired
    ReplyRepo replyRepo;

    @GetMapping("/test")
    public String test() {
        return "Api working";
    }

    @GetMapping("/all-question")
    public ResponseEntity<GripResponse> fetchAllQuestion() throws InterruptedException {
        logger.info("START");
        Thread.sleep(1000);
        List<QuestionEntity> ques = questionRepo.findAll();
        if (ques.isEmpty()) {

            GripResponse response = new GripResponse(404, GripConstants.RESPONSE_FAILED, Collections.emptyList());
            logger.info("END: No question found!");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            ques = ques.stream().sorted((x, y) -> y.getQId().compareTo(x.getQId())).collect(Collectors.toList());
            List<QuestionModel> models = QuestionModel.of(ques);
            GripResponse response = new GripResponse(200, GripConstants.RESPONSE_SUCCESS, models);
            logger.info("END: {} question(s) found!", ques.size());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PostMapping("/add-reply")
    public ResponseEntity<GripResponse> addReply(@RequestParam(name = "question") int qid, @RequestBody ReplyEntity reply) {

        try {
            logger.info("START: reply-> {}, question-id-> {}", reply, qid);
            reply.setReplyTime(GripUtil.convertDate(new Date()));
            reply.setReplyLike(0);
            reply.setReplyDislike(0);

            QuestionEntity question = questionRepo.findByqId(qid);
            List<ReplyEntity> replyEntities = question.getReplies();
            replyEntities.add(reply);
            question = questionRepo.saveAndFlush(question);
            GripResponse response = new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "Reply Submitted");
            logger.info("END: Reply Submitted");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("ERROR: {}", e.getLocalizedMessage());
            return new ResponseEntity<>(new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add-question")
    public ResponseEntity<GripResponse> addQuestion(@RequestBody QuestionEntity question) {
        try {
            logger.info("START");
            if (StringUtils.isBlank(question.getQTitle())) {
                throw new RuntimeException("No Question added");
            }

            if (StringUtils.isBlank(question.getQTime())) {
                question.setQTime(GripUtil.convertDate(new Date()));
            }
            List<ReplyEntity> replyEntities = question.getReplies();
            if (replyEntities == null) {
                replyEntities = Collections.emptyList();
            }
            question = questionRepo.save(question);
            GripResponse res = new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "Question Submitted");
            logger.info("END: Question Submitted");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("ERROR: {}", e.getLocalizedMessage());
            return new ResponseEntity<>(new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{qid}/{upvote}/upvote")
    public ResponseEntity<GripResponse> upvoteQuestion(@PathVariable(value = "qid") int qid, @PathVariable(value = "upvote") int upvote) {
        try {
            logger.info("START: upvote={}, qid={}", upvote, qid);
            questionRepo.updateUpvote(upvote, qid);
            return new ResponseEntity<>(new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "question id " + qid + " upvoted"), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("ERROR: {}", e.getLocalizedMessage());
            return new ResponseEntity<>(new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{qid}/{downvote}/downvote")
    public ResponseEntity<GripResponse> downvoteQuestion(@PathVariable(value = "qid") int qid, @PathVariable(value = "downvote") int downvote) {
        try {
            logger.info("START: downvote={}, qid={}", downvote, qid);
            questionRepo.updateDownvote(downvote, qid);
            return new ResponseEntity<>(new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "question id " + qid + " down-voted"), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("ERROR: {}", e.getLocalizedMessage());
            return new ResponseEntity<>(new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{qid}/{reply-id}/like")
    public ResponseEntity<GripResponse> likeReply(@PathVariable(value = "qid") int qid, @PathVariable(value = "reply-id") int replyId) {

        try {
            logger.info("START: replyId={}, qid={}", replyId, qid);
            QuestionEntity question = questionRepo.findByqId(qid);
            ReplyEntity replyEntity = question.getReplies().stream().filter(x -> x.getReplyId().equals(replyId)).findAny().orElse(null);
            if (replyEntity != null) {
                int like = replyEntity.getReplyLike() + 1;
                replyRepo.updateLikeForReply(like, replyId, qid);
                return new ResponseEntity<>(new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "reply liked"), HttpStatus.OK);
            } else {
                logger.error("ERROR: No reply");
                return new ResponseEntity<>(new GripResponse(404, GripConstants.RESPONSE_FAILED, "Wrong reply-id! No reply found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            logger.error("ERROR: {}", e.getLocalizedMessage());
            return new ResponseEntity<>(new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/{qid}/{reply-id}/dislike")
    public ResponseEntity<GripResponse> dislikeReply(@PathVariable(value = "qid") int qid, @PathVariable(value = "reply-id") int replyId) {
        try {
            logger.info("START: replyId={}, qid={}", replyId, qid);
            QuestionEntity question = questionRepo.findByqId(qid);
            ReplyEntity replyEntity = question.getReplies().stream().filter(x -> x.getReplyId().equals(replyId)).findAny().orElse(null);
            if (replyEntity != null) {
                int dislike = replyEntity.getReplyDislike() + 1;
                replyRepo.updateDislikeForReply(dislike, replyId, qid);
                return new ResponseEntity<>(new GripResponse(200, GripConstants.RESPONSE_SUCCESS, "reply disliked"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new GripResponse(404, GripConstants.RESPONSE_FAILED, "Wrong reply-id! No reply found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            logger.error( "ERROR: {}", e.getLocalizedMessage() );
            return new ResponseEntity<>(new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<GripResponse> searchQuestion (@RequestParam String query){
        try {
            logger.info("START: search with= {}", query);
            List<QuestionEntity> questions = questionRepo.getAllQuestion();
            List<QuestionEntity> qTitleMatch = questions.stream().filter(x -> x.getQTitle().toLowerCase().contains(query.toLowerCase())).collect(Collectors.toList());
            List<QuestionEntity> qDescMatch = questions.stream().filter(x -> x.getQDesc().toLowerCase().contains(query.toLowerCase())).collect(Collectors.toList());
            qTitleMatch.addAll(qDescMatch);
            logger.info("END: {} total match found", qTitleMatch.size());
            return new ResponseEntity<>( new GripResponse(200, GripConstants.RESPONSE_SUCCESS, qTitleMatch), HttpStatus.OK );
        }catch (Exception e) {
            logger.error("ERROR: {}", e.getLocalizedMessage());
            return new ResponseEntity<>(new GripResponse(500, GripConstants.RESPONSE_FAILED, e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
