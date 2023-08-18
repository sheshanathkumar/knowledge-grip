package com.sk.grip.repo;

import com.sk.grip.entity.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepo extends JpaRepository<ReplyEntity, Integer> {
}
