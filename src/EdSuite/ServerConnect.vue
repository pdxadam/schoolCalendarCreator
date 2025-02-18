<script setup>
    import edsuite from '@/EdSuite/edsuite';
    import { ref, onMounted } from 'vue';
    import { ToastProgrammatic as Toast } from 'buefy'
    import LoginForm from '@/EdSuite/loginForm.vue';
    import RegisterForm from '@/EdSuite/registerForm.vue';
    const props = defineProps({
        obj: Object,
        hasChanged: Boolean,
        appNumber: Number,
    });
    const emit = defineEmits(["saved", "fetched"]);
    onMounted(() => {
        var ticker = setInterval(saveCheck, 30000);
        //every 30 seconds, call autoSave, which only does anything if changes have happened and it's on
    });
    function saveCheck(){
        //chgeck if I shoiudl save to the server automatically, and do so.
        
        if (loggedIn.value == true && autoSave.value == true && props.hasChanged == true){
            
            saveToServer();
            props.hasChanged = false;
        }
    }
    const toast = new Toast();

    const appID = props.appNumber;
    const ed = edsuite.GetAxios();
    const loggedIn = ref(false);
    const autoSave = ref(false);
    const loginFormActive = ref(false);
    const registerFormActive = ref(false);
    const username = ref("dunno");
    function openLoginForm(){
        loginFormActive.value = true;
    }

    function openRegisterForm(){
        registerFormActive.value = true;
    }
    function updateLogin(value, u){
        
        if (value === true){
            username.value = u;
            toast.open({duration: 3000, type: "is-success", message: "Login Successful"});
        }
        else{
            toast.open({duration: 3000, type: "is-danger", message: u});
        }
        loggedIn.value = value;
    }
    function updateRegister(value, message){
        if (value == true){
            toast.open({duation: 3000, type: "is-success", message: "Registration Successful. Please login"});
            registerFormActive.value = false;
            loginFormActive.value = true;
        }
        else{
            toast.open({duration: 3000, type: "is-danger", message: message});
        }
    }
    // async function fetchData(){
    //     if (!confirm("Are you sure you want to replace existing data with server data")){
    //         toast.open("Request Canceled");
    //         return;
    //     }

    //     let d = await ed.sendPost({rq:30});
    //     if (typeof(d) == "string" && d.startsWith("Error")){
    //         toast.open({duration: 3000, type: "is-danger", message: d });
    //     }
    //     else if (d.length == 0){
    //         toast.open({duration: 3000, type: "is-warning", message: "Server data was empty"});
    //     }
    //     else{
    //         Object.assign(props.school, School.FromJson(d));
    //         toast.open({duration: 3000, type: "is-success", message: "School information updated" });
    //     }
    // }
    async function fetchData(){
        if (!confirm("Are you sure you want to replace existing data with server data")){
            toast.open("Request Canceled");
            return;
        }

        let d = await ed.sendPost({rq:30});
        if (typeof(d) == "string" && d.startsWith("Error")){
            toast.open({duration: 3000, type: "is-danger", message: d });
        }
        else if (d.length == 0){
            toast.open({duration: 3000, type: "is-warning", message: "Server data was empty"});
        }
        else{
            emit("fetched", d);
            toast.open({duration: 3000, type: "is-success", message: "Information updated" });
        }
    }
    async function saveToServer(){
        const jOBJ = JSON.stringify(props.obj);
        const res = await(ed.sendPost({ rq:40, d: jOBJ }));
        if (typeof(res) == "string" && res.startsWith("Error 3")){
            loggedIn.value = false;

        }
        else{

            emit("saved");
        }
        toast.open(res);
        //TODO: verify these results as the kind of json we want.--there is some ugliness here.
        

    }
    async function logout(){
        const res = await ed.sendPost({rq:100});
        if (res == "User logged out"){
            toast.open("Logout Successful");
            loggedIn.value = false;
        }
        else{
            toast.open({duration: 3000, type: "is-warning", message: "There was a problem logging out."});
        }
    }

</script>
<template>
    <nav>
           
        <span id="serverTools" v-if = loggedIn>
            <span id="username">{{ username }}</span>
            <b-button size="is-small" @click = "fetchData()">Get Data</b-button>
            <b-switch v-model="autoSave" size="is-small" left-label="true"
            type="is-info">
                AutoSave {{ hasChanged?"*":"" }}
            </b-switch>
            <b-button size="is-small" @click="saveToServer()">Save {{ hasChanged?"*":"" }}</b-button>
            
            <b-button size="is-small" @click="logout()">Log out</b-button>
        </span>
        <span id="login" v-else>
            <b-button size="is-small" @click="openLoginForm()">Login</b-button>
            <b-button size="is-small" @click="openRegisterForm()">Register</b-button>

        </span>
    </nav>
    <!-- Need a modal login page here -->
     <b-modal v-model = "loginFormActive" has-modal-card trap-focus :destroy-on-hide = "false">
        <LoginForm @loginUpdate = "(v, u) => updateLogin(v, u)" @close = "loginFormActive = false" />

     </b-modal>
    <!-- Need a modal create account page here -->
    <b-modal v-model = "registerFormActive" has-modal-card trap-focus :destroy-on-hide = "false">
        <RegisterForm @registerUpdate = "(v, u) => updateRegister(v, u)" @close = "registerFormActive = false" />
    </b-modal>

</template>
<style scoped>
    nav{
        background: rgba(0,0,0,0.7);
        color: white;
        position: relative;
        text-align: right;
    }
    nav *{
        margin: 3px;
    }
    #username{
        font-size: 0.8rem;
        font-style: italic;
    }

</style>