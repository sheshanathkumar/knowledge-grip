package com.sk.grip.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "grip_question")
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer qId;
    private String qTitle;
    private String qDesc;
    private String qAuthor;
    private Integer qUpvote;
    private Integer qDownvote;
    private String qTime;

    @OneToMany(targetEntity = ReplyEntity.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_qid", referencedColumnName = "qId")
    private List<ReplyEntity> replies;

}
