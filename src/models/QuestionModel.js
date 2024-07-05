export class QuestionModel {
    constructor(questionId, title, topic, description,images, createdAt, userId, username,avatar, totalVotes, totalViews, totalShares, totalAnswers, isVoted, isSaved) {
        this.questionId = questionId;
        this.title = title;
        this.topic = topic;
        this.description = description;
        this.images = images;
        this.createdAt = createdAt;
        this.userId = userId;
        this.username = username;
        this.avatar = avatar;
        this.totalVotes = totalVotes;
        this.totalViews = totalViews;
        this.totalShares = totalShares;
        this.totalAnswers = totalAnswers;
        this.isVoted = isVoted;
        this.isSaved = isSaved;
    }
}