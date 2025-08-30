const loadPostData = async (searchCategory='comedy') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchCategory}`);
    const data = await res.json();
    // console.log(data.posts);
    displayPostData(data.posts);
}

const displayPostData = (posts) => {
    // toggleLoadingSpinner(true);
    const allPostContainer = document.getElementById('all_post_container');
    allPostContainer.textContent='';
    for (const post of posts) {
        // console.log(typeof post);
        const postCard = document.createElement('div');
        postCard.innerHTML = `
        <figure>
            <img class="h-[72px] w-[72px] rounded-2xl" src="${post.image}" alt="image" />
        </figure>
        <div class="card-body">
            <div class="font_inter flex gap-5">
                <p class="">#<span>${post.category}</span></p>
                <p>Author: <span>${post.author.name}</span></p>
            </div>
            <div class="border-dashed border-b mt-2 mb-2">
                <h4 class="font-bold text-[20px]">${post.title}</h4>
                <p class="font_inter text-gray-500 mb-3">${post.description}</p>
            </div>
            <!-- card icon -->
            <div class="flex justify-between">
                <div class="flex gap-4">
                    <div class="flex justify-center items-center gap-2">
                        <img src="images/icons/message-2.png" alt="">
                        <span>${post.comment_count}</span>
                    </div>
                    <div class="flex justify-center items-center gap-2">
                        <img src="images/icons/eye.png" alt=""> <span>${post.view_count}</span>
                    </div>
                    <div class="flex justify-center items-center gap-2">
                        <img src="images/icons/clock-hour-9.png" alt=""> <span>${post.posted_time} min</span>
                    </div>
                </div>
                <button id="${post.id}"><img src="images/icons/email 1.png" alt=""></button>
            </div>
        </div>
        `;
        postCard.classList = `card card-side bg-gray-200 shadow-sm p-6 mb-4`;
        allPostContainer.appendChild(postCard);

        const btn = document.getElementById(`${post.id}`);
        // console.log(btn);
        btn.addEventListener('click', () =>{
            selectPost(post);
        })
    }
    // toggleLoadingSpinner(false);
}

const searchWithCategory = () => {
    const searchField = document.getElementById('search_field');
    const searchText = searchField.value;
    loadPostData(searchText);
}

const displaySelectedPost = post => {
    // toggleLoadingSpinner(true);
    //show selected post section after click a post
    const selectedPostSection = document.getElementById('selected_post_section');
    selectedPostSection.classList.remove('hidden');

    // show which post is clicked
    const selectedPostContainer = document.getElementById('selected_post_conatainer');
    const selectedPostCard = document.createElement('div');
    selectedPostCard.innerHTML = `
    <div class="flex justify-between bg-white p-5 rounded-2xl mb-4">
        <p>${post.title}</p>
        <div class="flex justify-center items-center gap-2">
            <img src="images/icons/eye.png" alt=""> <span>${post.view_count}</span>
        </div>
    </div>
    `;
    selectedPostContainer.appendChild(selectedPostCard);
    // toggleLoadingSpinner(false);
}

let count = 0;
const selectPost = post => {
    // console.log(typeof post);

    count++;
    const selectPostCount = document.getElementById('select_post_count')
    selectPostCount.innerText = count;

    // display selected post
    displaySelectedPost(post);
    
}

const loadLatestPostData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data.posts);
    displayLatestPostData(data);
}

const displayLatestPostData = posts => {
    const latestPostContainer = document.getElementById('latest_post_container');
    for(const post of posts){
        // console.log(post);
        const latestPostCard = document.createElement('div');
        latestPostCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${post.cover_image}"
                alt="image" class="rounded-xl" />
        </figure>
        <div class="card-body">
            <div class="card-actions">
                <img src="images/icons/publish.png" alt="">
                <span>${post?.author?.posted_date || 'Not Published'}</span>
            </div>
            <h2 class="card-title">${post.title}</h2>
            <p>${post.description}</p>
            <div class="flex gap-4">
                <img class="h-[44px] w-[44px] rounded-full object-cover" src="${post.profile_image}" alt="from api">
                <div>
                    <h3 class="font-bold">${post.author.name}</h3>
                    <p>${post.author?.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>
        `;
        latestPostCard.classList = `card bg-base-100 w-96 shadow-sm`;
        latestPostContainer.appendChild(latestPostCard);
    }
}

const toggleLoadingSpinner = (isLoad) => {
    const loadSpinner = document.getElementById('loading_spinner');
    if(isLoad){
        loadSpinner.classList.remove('hidden');
    }else{
        loadSpinner.classList.add('hidden');
    }
}

loadPostData();
loadLatestPostData();