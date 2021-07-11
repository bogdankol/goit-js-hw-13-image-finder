export default async function (whatToSearch, numberOfPage) {
    const API_KEY = '22223449-0f7605970ab6351a0732adfe1';
    const fetched = await fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${whatToSearch}&page=${numberOfPage}&per_page=12&key=${API_KEY}`
    )
    const result = await fetched.json();
    return result.hits
}