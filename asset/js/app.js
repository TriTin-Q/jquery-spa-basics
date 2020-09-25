// console.log(window.location);
let MON_SUPER_SITE = {};



let addLogoutButton = function(){
    $('.logout').load('templates/partials/_logout.html');
}

let addLoginButton = function(){
    $('.login').html(`
    <a href="#login" class="btn btn-success">Login </a>
    `);
}

let handlRequest = function (){
    let user ={};

    $('.logout').html('');

    $.get('security.php',function(response){
        
        response = JSON.parse(response);

        console.log(response);
        //Si utilisateur est connecté
        if(response.user){
            MON_SUPER_SITE['security']=response.user;
            addLogoutButton();
        }

        if(!response.user){
            addLoginButton();
        }
        
        let baseUrl = window.location.origin;
        let page ="";
        if(window.location.hash === ""){
            page = 'homepage';
        }
        if(window.location.hash !== ""){
            page = window.location.hash.split('#')[1];
        }

        if(!response.user && page !== 'login'){
            window.location.hash = '#homepage';
        }
    
        if(response.user && page === 'login'){
            window.location.hash = '#homepage';
        }

        $('.container').load('templates/'+page+'.html',function(){
            console.info('page '+page+' was loaded');
        });
    })


}

handlRequest();

$(window).on('hashchange',function(){
    handlRequest();
})

$('body').on('SECURITY_LOGOUT',handlRequest);