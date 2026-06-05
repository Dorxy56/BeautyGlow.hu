export async function onRequestGet({ env }) {
    try {
        const listed = await env.BUCKET.list({
            prefix: 'galeria/',
            delimiter: '/'
        });

        const categories = [];

        for (const prefix of listed.delimitedPrefixes) {
            const folderName = prefix.replace('galeria/', '').replace(/\/$/, '');

            const contents = await env.BUCKET.list({ prefix });

            const images = contents.objects
                .map(obj => obj.key.replace(prefix, ''))
                .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
                .filter(f => f.length > 0);

            if (images.length > 0) {
                categories.push({
                    id: encodeURIComponent(folderName),
                    name: folderName,
                    folder: prefix,
                    images
                });
            }
        }

        return new Response(JSON.stringify({ categories }), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300'
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
