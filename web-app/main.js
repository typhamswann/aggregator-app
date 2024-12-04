document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.getElementById("blog-container");
  
    // Define dictionaries for tag and author colors
    const tagColors = {};
  
    const authorColors = {
      "Sanity.io": "#f36458",
      "Contentful": "#2b80f0",
      "WordPress": "#3a58de",
      "Optimizely": "#2b80f0"
    };
  
    // Image dictionary for authors
    const authorImages = {
        "AEM": "aem.png",
        "Builder": "builder.png",
        "CMSWire": "cmswire.png",
        "Contentful": "contentful.png",
        "Contentstack": "contentstack.png",
        "Directus": "directus.png",
        "dotCMS": "dotcms.png",
        "Drupal": "drupal.png",
        "Hygraph": "hygraph.png",
        "Kentico": "kentico.png",
        "KontentAI": "kontentai.png",
        "MACH": "mach.png",
        "Martech": "martech.png",
        "Medium": "medium.png",
        "Podcast": "podcast.png",
        "Prismic": "prismic.png",
        "Reddit": "reddit.png",
        "Sanity": "sanity.png",
        "Sitecore": "sitecore.png",
        "Storyblok": "storyblok.png",
        "Strapi": "strapi.png",
        "Substack": "substack.png",
        "WordPress": "wordpress.png",
        "Optimizely": "optimizely.png",
        "Techcrunch": "tc.png",
        "Technology": "technology.png"
      };
      
  
    fetch('posts.json')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          // Calculate date difference
          const postDate = new Date(post.Date);
          const today = new Date();
          const diffTime = today - postDate;
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
          let formattedDate;
          const oneYear = 365;
  
          if (diffDays === 0) {
            formattedDate = "Today";
          } else if (diffDays > 0 && diffDays < oneYear) {
            formattedDate = `${diffDays} days ago`;
          } else {
            formattedDate = post.Date; // Show original date if over a year old
          }
  
          // Get tag and author colors, fallback to default
          const tagColor = tagColors[post.Tag] || "#492059"; // Default for tags
          const authorColor = authorColors[post.Source] || "#333"; // Default for authors
  
          // Get author image, fallback to a default image
          const authorImage = authorImages[post.Source] || "default.png";
          const postElement = document.createElement("article");
          postElement.innerHTML = `
            <img src="images/${authorImage}" alt="${post.Source}">
            <div class="article-content">
              <p class="tag" style="color: ${tagColor};">${post.Tag}</p>
              <h2>${post.Title}</h2>
              <p class="author-date">
                <strong style="color: ${authorColor};">${post.Source}</strong> - ${formattedDate}
              </p>
            </div>
          `;
  
          // Make the entire article clickable
          postElement.addEventListener('click', () => {
            window.open(post.Link, '_blank');
          });
          blogContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error("Error loading posts:", error));
  });
  