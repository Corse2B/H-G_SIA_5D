async function poserQuestion() {
    const question = document.getElementById("question").value;

    const response = await fetch("https://ia.chronographia5dsia.pages.dev/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer mon_super_token"
        },
        body: JSON.stringify({ question: question })
    });

    const data = await response.json();
    document.getElementById("reponse").innerText = data.answer || data.error;
}
