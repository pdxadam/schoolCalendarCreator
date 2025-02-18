<script setup>
    import { ref } from 'vue';
    import edsuite from '@/EdSuite/edsuite.js';

    const ed = edsuite.GetAxios();

    const loginMessage = ref("");
    const email = ref("");
    const password = ref("");
    const emit = defineEmits(["close", "loginUpdate"]);
    async function login(){
        try{
            const response = await ed.sendPost({"rq": 10, 
            "e": email.value, 
            "p": password.value, 
            "app": 2});
            if (response == "Success."){
                // TODO: get username back from this.
                emit("loginUpdate", true, email.value);
                loginMessage.value = "Logged in.";
                close();
            }
            else{
                emit("loginUpdate", false, "Invalid Username or Password");
                loginMessage.value = response;
            }
        }
        catch(e){
            emit("loginUpdate", false, "Server error: " + e.message);

        }
    }
    function close(){
        email.value = "";
        password.value = "";
        emit("close");
    }
    function clearIconClick(){
        email.value = "";
    }
</script>
<template>
    <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')" />
                    </header>
                    <section class="modal-card-body">
                        
                        <b-field>
                            <b-input placeholder="Email"
                                v-model="email"
                                type="email"
                                icon="email"
                                icon-right="close-circle"
                                icon-right-clickable
                                @icon-right-click="clearIconClick">
                            </b-input>
                        </b-field>
                        <b-field label="Password">
                            <b-input
                                type="password"
                                v-model="password"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>
                        <div>{{ loginMessage }}</div>
                    </section>
                    <footer class="modal-card-foot">
                        <b-button
                            label="Close"
                            @click="close()" />
                        <b-button
                            label="Login"
                            type="is-primary" 
                            @click = "login()"/>
                    </footer>
                </div>
            </form>

</template>
<style scoped>

</style>