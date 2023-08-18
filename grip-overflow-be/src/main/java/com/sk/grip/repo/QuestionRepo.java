package com.sk.grip.repo;

import com.sk.grip.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepo extends JpaRepository<QuestionEntity, Integer> {

    public QuestionEntity findByqId(Integer qid);

}
