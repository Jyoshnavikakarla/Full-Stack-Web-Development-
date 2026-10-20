const view= document.getElementById("view");
function navigate(page){
    if(page === "home"){
        view.innerHTML="<h2>Home Page</h2><p>Welcome to world of full stack development</p>";
    } else if(page ==="about"){
        view.innerHTML="<h2>About Us</h2><p>we love to code</p>";
    }
}
window.onload=()=> navigate("home");