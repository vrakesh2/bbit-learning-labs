import NewsCard from "@/components/NewsCard";
import NewsFeed from "@/components/NewsFeed";
import {useState, useEffect } from "react";

import { Article } from "@/utils/types";


// DUMMY DATA
import * as featureStoryJson from "../../public/test-data/test_feature.json";
import FeaturedNewsCard from "@/components/FeaturedNews";

let mainStory: Article = {
    title: featureStoryJson.thread.title,
    image_url: featureStoryJson.thread.main_image,
    body: featureStoryJson.text.slice(0, 500) + "...",
    author: featureStoryJson.author,                 // story author
    url: featureStoryJson.url,                       // story url
    publish_date: new Date(featureStoryJson.published)    // story publish date
}


// fake dummy data
let moreNews: Article[] = [
    {
        title: "Dummy Story 1",
        image_url: "/globe.svg",
        body: "This is a story.",
        url: "bloomberg.com",
        author: "John Doe",
        publish_date: new Date()
    },
    {
        title: "Dummy Story 2",
        image_url: "/globe.svg",
        body: "This is a story.",
        url: "bloomberg.com",
        author: "John Doe",
        publish_date: new Date()

    },
    {
        title: "Dummy Story 3",
        image_url: "/globe.svg",
        body: "This is a story.",
        url: "bloomberg.com",
        author: "John Doe",
        publish_date: new Date()
    },
]

export default function News() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const articlesResponse = await fetch('/api/news/get-newsfeed', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const featuredArticleResponse = await fetch('/api/news/get-featured-article', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            setArticles(await articlesResponse.json());
            setFeaturedArticle(await featuredArticleResponse.json());
        }
        fetchData();
    }, [])


    return (
        <div>
            <div className="grid grid-cols-4 space-x-2 space-y-2 pt-2">
                <div className="col-span-4 lg:col-span-3">
                    <FeaturedNewsCard article={featuredArticle} />
                    <NewsFeed articles={articles} />

                    {/* Once you're done with Part 4, feel free to remove the span below! */}
                    <span className="instruction">Part 4: Connect the backend and fetch real data</span>

                </div>
                <div className="hidden lg:block col-span-1 overflow-hidden border-l border-slate-300">
                    <div className="flex flex-col gap-4 divide-y divide-slate-300 space-x-2">
                    {
                        articles.slice(-6).map((article, i) => (
                            <NewsCard
                                key={`${article}_${i}`}
                                article={article}
                            />
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}
