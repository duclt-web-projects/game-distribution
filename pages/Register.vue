<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";

useHead({
  title: "Register - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
    { name: "ogTitle", content: "Register - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
  ],
  bodyAttrs: {
    class: "register",
  },
});

const firstName = ref(null);
const lastName = ref(null);
const email = ref(null);
const password = ref(null);
const errors = ref(null);

const register = async () => {
  console.log(email.value, password.value);
};
</script>

<template>
  <AuthLayout>
    <form @submit.prevent="register">
      <InputTextAuth
        placeholder="First Name"
        v-model:input="firstName"
        inputType="text"
        :error="errors && errors.firstName ? errors.firstName[0] : ''"
      />
      <InputTextAuth
        placeholder="Last Name"
        v-model:input="lastName"
        inputType="text"
        :error="errors && errors.lastName ? errors.lastName[0] : ''"
      />
      <InputTextAuth
        placeholder="Email"
        v-model:input="email"
        inputType="email"
        :error="errors && errors.email ? errors.email[0] : ''"
      />
      <InputTextAuth
        placeholder="Password"
        v-model:input="password"
        inputType="text"
        :error="errors && errors.password ? errors.password[0] : ''"
      />
      <div class="form__checkbox">
        <label class="checkbox">
          <span class="checkbox-label"> Remember me </span>
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="form__dropdown">
        <InputTextAuth
          placeholder="Password"
          v-model:input="password"
          inputType="text"
          :error="errors && errors.password ? errors.password[0] : ''"
        />
        <div class="dropdown-menu" style="/* display: none; */">
          <div class="dropdown-content">
            <!---->
            <a class="dropdown-item"><span>Boli<b>vi</b>a</span></a
            ><a class="dropdown-item"><span>Bosnia and Herzego<b>vi</b>na</span></a
            ><a class="dropdown-item"><span>Falkland Islands (Mal<b>vi</b>nas)</span></a
            ><a class="dropdown-item"><span>Lat<b>vi</b>a</span></a
            ><a class="dropdown-item"><span>Saint Kitts and Ne<b>vi</b>s</span></a
            ><a class="dropdown-item"
              ><span>Saint <b>Vi</b>ncent and the Grenadines</span></a
            ><a class="dropdown-item"><span>Taiwan, Pro<b>vi</b>nce of China</span></a
            ><a class="dropdown-item"
              ><span><b>Vi</b>etnam</span></a
            ><a class="dropdown-item"
              ><span><b>Vi</b>rgin Islands, British</span></a
            ><a class="dropdown-item"
              ><span><b>Vi</b>rgin Islands, U.S.</span></a
            >
            <!---->
          </div>
        </div>
      </div>
      <p class="forget-password">
        <NuxtLink href="/">Forgot Password?</NuxtLink>
      </p>
      <input type="hidden" name="credentialId" value="" />
      <div class="form__button">
        <button type="submit" name="login">
          <span>Login</span>
        </button>
      </div>
    </form>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.form__dropdown {
  position: relative;

  .dropdown-menu {
    display: none;
    width: 100%;
    left: 0;
    min-width: 12rem;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    z-index: 20;
  }

  .dropdown-content {
    overflow-x: hidden;
    max-height: 200px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }

  .dropdown-item {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
    width: 100%;
    color: #4a4a4a;
    display: block;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 0.375rem 1rem;
    padding-right: 3rem;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
      color: #0a0a0a;
    }
  }
}
</style>
