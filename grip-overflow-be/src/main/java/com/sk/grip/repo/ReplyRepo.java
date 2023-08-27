package com.sk.grip.repo;

import com.sk.grip.entity.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ReplyRepo extends JpaRepository<ReplyEntity, Integer> {

    @Transactional
    @Modifying
    @Query(value = "update grip_reply set reply_like = ?1 where reply_id = ?2 and fk_qid = ?3  ", nativeQuery = true)
    public void updateLikeForReply (int like, int repId, int qid);

    @Transactional
    @Modifying
    @Query(value = "update grip_reply set reply_dislike = ?1 where reply_id = ?2 and fk_qid = ?3  ", nativeQuery = true)
    void updateDislikeForReply(int dislike, int replyId, int qid);
}
