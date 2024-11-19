

const input = document.querySelector('.get-repos input');
const getButton = document.querySelector('.get-button');
const reposData = document.querySelector('.show-data');
const spinner = document.createElement('div');
spinner.className = 'spinner';
spinner.style.display = 'none'; 
reposData.appendChild(spinner);

getButton.addEventListener('click', getRepos);

async function loader(duration) {
    spinner.style.display = 'block'; 
    await delay(duration);          
   
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 function cleanPage() {
    input.value = '';

    reposData.innerHTML = ' <span>No Data To Show</span>';
    
}
async function getRepos() {
    try { 
    let githubUser = input.value.trim();

   if (githubUser === '') {
   await loader(1000);
   
       reposData.innerHTML = '<span> Please enter a valid username </span>';
   } else {
    await loader(1000);

  const response = await fetch(`https://api.github.com/users/${githubUser}/repos`);
  
  if (!response.ok) {
    
   
      throw new Error(`Fetch failed: ${response.status}`);
  }

  const data = await response.json();
  reposData.innerHTML = '';

  if (Math.random() < 0.30) {
    
    throw new Error('Server is down');
  }

  
  if (data.length === 0) {
  reposData.innerHTML = `<span>No repositories found for user "${githubUser}".</span>`;
  } 
   repoRender(data , githubUser)


   }
 
   
       } catch (error) {
       
        renderError(error)

       }
   }
        


 function repoRender(data , githubUser){

     data.forEach(repo => {
  let repoDiv = document.createElement('div');
  let repoName = document.createTextNode(repo.name.toUpperCase());
  repoDiv.appendChild(repoName);
  repoDiv.className = 'repo-box';
   
  let url = document.createElement('a');
  url.textContent = 'Visit';
  url.href = `https://github.com/${githubUser}/${repo.name}`;
  url.target = '_blank';
  repoDiv.appendChild(url);
   
  let forksSpan = document.createElement('span');
  forksSpan.textContent = `Forks: ${repo.forks}`; 
  repoDiv.appendChild(forksSpan);
   
  let description = document.createElement('p');
  description.textContent = repo.description || 'No description';
  repoDiv.appendChild(description);
   
  reposData.appendChild(repoDiv);
  

  
     });
   }
 
   function renderError(error){
    reposData.innerHTML = '';
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('error-div');
    
    let errorMessage = document.createElement('span');
    errorMessage.textContent = `Error: ${error.message}`;
    errorDiv.appendChild(errorMessage);
    
    let tryAgainButton = document.createElement('span');
    tryAgainButton.textContent = 'home Page';
    errorDiv.appendChild(tryAgainButton);
    reposData.appendChild(errorDiv);
    tryAgainButton.addEventListener('click', () => {
       
        cleanPage()
    
      });

      let homePage = document.createElement('span');
      homePage.textContent = 'Try Again';
      errorDiv.appendChild(homePage);
      reposData.appendChild(errorDiv);
      homePage.addEventListener('click', () => {
        
         getRepos()
      
        });
  
    
}
