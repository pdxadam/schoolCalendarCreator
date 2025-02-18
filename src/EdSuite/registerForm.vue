<script setup>
   import { ref } from 'vue';
    import edsuite from '@/EdSuite/edsuite.js';

    const ed = edsuite.GetAxios();

    const loginMessage = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const emit = defineEmits(["close", "registerUpdate"]);
    async function register(){
        try{
            const response = await ed.sendPost({"rq": 5, 
                "u": username.value, 
                "e": email.value,
                "p": password.value,
            });
            if (response == "Success"){
                emit("registerUpdate", true, username.value);
                loginMessage.value = "Registration Succeeded. Please Login";
                close();
            }
            else{
                emit("registerUpdate", false, response);
                loginMessage.value = response;
            }
            //TODO: the messaging on the response is not working right. 
        }
        catch(e){
            emit("loginUpdate", false, "Server error: " + e.message);

        }
    }
    function close(){
        username.value = "";
        password.value = "";
        email.value = "";
        emit("close");
    }
</script>
<template>
    <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Register Account</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <b-field>
                            <b-input placeholder="Name"
                                v-model="username"
                                type = "text">
                            </b-input>
                        </b-field>
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
                            label="Register"
                            type="is-primary" 
                            @click = "register()"/>
                    </footer>
                </div>
            </form>

</template>
<style scoped>

</style>