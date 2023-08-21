package com.sk.grip.model;

import com.sk.grip.entity.QuestionEntity;
import com.sk.grip.entity.ReplyEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionModel implements Serializable {
    private Integer id;
    private String title;
    private String desc;
    private String author;
    private Integer upvote;
    private Integer downvote;
    private String time;
    private String[] tag;
    private List<ReplyEntity> replyEntities;

    public static List<QuestionModel> of ( List<QuestionEntity> questionEntities) {

        List<QuestionModel> models = new ArrayList<>();
        questionEntities.forEach( (x) -> {
            QuestionModel model = new QuestionModel();
            model.setId(x.getQId());
            model.setDesc(x.getQDesc());
            model.setAuthor(x.getQAuthor());
            model.setTime(x.getQTime());
            model.setTitle(x.getQTitle());
            model.setUpvote(x.getQUpvote());
            model.setDownvote(x.getQDownvote());
            model.setTag(StringUtils.isBlank(x.getTag()) ? null : x.getTag().replaceAll(" ", "").split(",") );
            model.setReplyEntities(x.getReplies());
            models.add(model);
        }  );
        return models;
    }


}
