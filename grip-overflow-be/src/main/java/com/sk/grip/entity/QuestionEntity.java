package com.sk.grip.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.sk.grip.model.QuestionModel;
import com.sk.grip.util.GripUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
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

    @JsonProperty("qTitle")
    private String qTitle;

    @JsonProperty("qDesc")
    private String qDesc;

    @JsonProperty("qAuthor")
    private String qAuthor;

    @JsonProperty("qUpvote")
    private Integer qUpvote;

    @JsonProperty("qDownvote")
    private Integer qDownvote;

    @JsonProperty("qTime")
    private String qTime;

    @JsonProperty("tag")
    private String tag;

    @OneToMany(targetEntity = ReplyEntity.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_qid", referencedColumnName = "qId")
    private List<ReplyEntity> replies;



}
