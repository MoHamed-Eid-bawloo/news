const Type = document.getElementById("type");

const API_KEY = "d6a3a659380748ae80469a62b12d204c";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchData(query){
  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    Type.innerText = query;
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return { articles: [] };
  }
}

fetchData("all").then(data => renderMain(data.articles));

// Render news 
function renderMain(arr){
  let mainHTML = '';
  for(let i = 0 ; i < arr.length ; i++){
    if(arr[i].urlToImage){
      mainHTML += ` 
        <div class="card">
          <img src="${arr[i].urlToImage}" loading="lazy" />
          <h4>${arr[i].title}</h4>
          <div class="publishbyDate">
            <p>${arr[i].source.name}</p>
            <span>•</span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
          </div>
          <div class="desc">
            ${arr[i].description}
          </div>   
          <button style="width:max-content;padding:8px 12px;margin:15px" class="btn btn-outline-primary">
            <a href="${arr[i].url}" target="_blank">READ MORE</a>
          </button>                    
        </div>
      `;
    }
  }

  document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("newsQuery");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log(searchInput.value);
  const data = await fetchData(searchInput.value);
  renderMain(data.articles);
});

async function Search(query){
  const data = await fetchData(query);
  renderMain(data.articles);
  Type.innerText = query;
}

var ToTop = document.getElementById("topppp");

window.onscroll = function () {
  if (window.scrollY > 0) {
    ToTop.style.display = "block";
  } else {
    ToTop.style.display = "none";
  }
}
