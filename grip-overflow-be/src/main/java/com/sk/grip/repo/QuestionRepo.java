package com.sk.grip.repo;

import com.sk.grip.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<QuestionEntity, Integer> {

    public QuestionEntity findByqId(Integer qid);

    @Query(value = "update grip_question set q_upvote = ?1 where q_id = ?2", nativeQuery = true)
    @Transactional
    @Modifying
    public void updateUpvote (int upvote, int qid);

    @Query(value = "update grip_question set q_downvote = ?1 where q_id = ?2", nativeQuery = true)
    @Transactional
    @Modifying
    public void updateDownvote (int downvote, int qid);

    @Query(value = "select q_id, q_title, q_desc, q_author from grip_question ", nativeQuery = true)
    public List<QuestionEntity> getAllQuestion ();

}
