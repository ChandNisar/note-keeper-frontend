const API_BASE = "https://note-keeper-api-hsf5c3b7eef5fvh3.canadacentral-01.azurewebsites.net.azurewebsites.net/api";

// Charger les notes au démarrage
window.onload = getNotes;

function getNotes() {
  fetch(`${API_URL}/getNotes`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("notes");
      list.innerHTML = "";

      data.forEach(note => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${note.title}</strong><br>
          ${note.content}
          <span class="delete" onclick="deleteNote('${note.id}')">❌</span>
        `;
        list.appendChild(li);
      });
    });
}

function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  fetch(`${API_URL}/addNote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  })
  .then(() => {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    getNotes();
  });
}

function deleteNote(id) {
  fetch(`${API_URL}/deleteNote?id=${id}`, {
    method: "DELETE"
  })
  .then(() => getNotes());
}
