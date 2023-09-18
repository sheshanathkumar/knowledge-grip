CREATE TABLE IF NOT EXISTS public.grip_question
(
    q_id serial primary key,
    q_author text ,
    q_desc text,
    q_downvote integer,
    q_time text ,
    q_title text ,
    q_upvote integer,
    tag text
)


CREATE TABLE IF NOT EXISTS public.grip_reply
(
    reply_id serial primary key,
    reply_by text,
    reply_desc text,
    reply_dislike integer,
    reply_like integer,
    reply_time text,
    fk_qid integer,
    CONSTRAINT fk_qid FOREIGN KEY (fk_qid)
        REFERENCES public.grip_question (q_id)
)
