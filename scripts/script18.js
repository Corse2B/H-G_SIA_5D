const reader = res.body.getReader();
const decoder = new TextDecoder();

let buffer = "";
let text = "";

ai.innerHTML = "";

while (true) {

  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });

  const lines = buffer.split("\n");
  buffer = lines.pop();

  for (const line of lines) {

    if (!line.startsWith("data:")) continue;

    const json = line.replace("data:", "").trim();

    if (json === "[DONE]") break;

    try {

      const parsed = JSON.parse(json);

      if (parsed.response) {

        text += parsed.response;

        ai.innerHTML = marked.parse(text);

        scrollBottom();

      }

    } catch {}

  }

}
