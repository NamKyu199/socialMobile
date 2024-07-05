export class QuestionAnswerModel {
    constructor (answerId, content, userId, username, answerImage, totalAnswerVotes, createdAt, totalRepliesAnswer, isAnswerVoted) {
        this.answerId = answerId;
        this.content = content;
        this.userId = userId;
        this.username = username;
        this.answerImage = answerImage;
        this.totalAnswerVotes = totalAnswerVotes;
        this.createdAt = createdAt;
        this.totalRepliesAnswer = totalRepliesAnswer;
        this.isAnswerVoted = isAnswerVoted;
    }
}