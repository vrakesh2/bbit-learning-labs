"""Module for retrieving newsfeed information."""

from dataclasses import dataclass
from datetime import datetime


@dataclass
class Article:
    """Dataclass for an article."""

    author: str
    title: str
    body: str
    publish_date: datetime
    image_url: str
    url: str


def get_all_news() -> list[Article]:
    """Get all news articles from the datastore."""
    # 1. Use Redis client to fetch all articles
    # 2. Format the data into articles
    # 3. Return a list of the articles formatted 
    all_articles: list[dict] = REDIS_CLIENT.get_entry("all_articles")

    if all_articles is None:
        return []

    return [_format_as_article(article) for article in all_articles]
  


def get_featured_news() -> Article | None:
    """Get the featured news article from the datastore."""
    # 1. Get all the articles
    # 2. Return as a list of articles sorted by most recent date

    all_news = get_all_news()

    return sorted(all_news, lambda article: article.publish_date, reverse=True)[0] if all_news else None
   
def _format_as_article(data: dict) -> Article:
    return Article(
        author=data["author"],
        title=data["title"],
        body=data["text"],
        publish_date=datetime.fromisoformat(data["published"]),
        image_url=data["thread"]["main_image"],
        url=data["url"],
    )