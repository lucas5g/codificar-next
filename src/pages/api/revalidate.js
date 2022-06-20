export default async function handler(req, res) {
    await res.unstable_revalidate('/projetos')
    return res.json({ revalidated: true })
}