import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';
import Loading from '../../components/loading';

export default function index() {
    const [imageDescription, setImageDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const showImage = async () => {
        setLoading(true)
        var response = await openai.createImage({
            prompt: imageDescription,
            n: 1,
            size: "1024x1024",
        });
        setImageUrl(response.data.data[0].url)
        setLoading(false)
    }

    return (
        <form className="flex flex-col  justify-center">
            {loading ? (
                <Loading />
            ) : (
                <picture>
                    <source srcSet={`${imageUrl} 2x`} media="(min-width: 768px)" />
                    <img
                        src={imageUrl}
                        alt="placeholder"
                        className="mb-4"
                        style={{ maxWidth: '100%', height: '200px' }}
                    />
                </picture>
            )}
            <textarea
                onChange={(e) => setImageDescription(e.target.value)}
                placeholder="Enter text"
                className="py-2 px-4 border border-gray-500 rounded-lg mb-4"
            ></textarea>
            <button
                type="button"
                onClick={() => showImage()}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    )
}
