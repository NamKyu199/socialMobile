export class QuestionRepliesAnswerModel {
    constructor(answerId, content, userId, username, parentAnswerId, image, totalVotes, createdAt, isVoted) {
        this.answerId = answerId;
        this.content = content;
        this.userId = userId;
        this.username = username;
        this.parentAnswerId = parentAnswerId;
        this.image = image;
        this.totalVotes = totalVotes;
        this.createdAt = createdAt;
        this.isVoted = isVoted;
    }
}