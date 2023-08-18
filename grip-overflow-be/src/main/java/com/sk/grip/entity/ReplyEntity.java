package com.sk.grip.entity;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "grip_reply")
public class ReplyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer replyId;
    private String replyDesc;
    private String replyBy;
    private Integer replyLike;
    private Integer replyDislike;
    private String replyTime;

}
