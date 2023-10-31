<script setup>
import IconArrowUpRightFromSquare from '@/assets/icon/ArrowUpRightFromSquare.vue';
import { useUserStore } from '@/stores/useUserStore';
import { StarIcon } from '@heroicons/vue/24/outline';
import { PencilIcon, UserCircleIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  game: Object,
});

const { $toast } = useNuxtApp();
const userStore = useUserStore();
const commentText = ref('');
const commentError = ref('');
const rating = ref(5);
const fetchComment = ref(false);

const addComment = async () => {
  commentError.value = '';
  if (commentText.value === '') {
    commentError.value = 'Please enter comment.';
    return;
  }

  const { data, error } = await useHttp(`game/${props.game.id}/comment`, {
    method: 'POST',
    body: {
      comment: commentText.value,
      rating: rating.value,
    },
  });

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    fetchComment.value = !fetchComment.value;
    $toast.success('Add comment successfully.');
  }
};

const changeStarRate = (rate) => {
  rating.value = rate;
};

const { data: gamesSameCategory } = await useHttp(`games`, {
  query: {
    categories: props.game.categories.map((cate) => cate.id).toString(),
    limit: 10,
  },
});

const { data: gamesSameTag } = await useHttp(`games`, {
  query: {
    tags: props.game.tags.map((cate) => cate.id).toString(),
    limit: 10,
  },
});

const { data: comments } = await useHttp(`game/${props.game.id}/comments`, {
  server: false,
  watch: [fetchComment],
});
</script>

<template>
  <div class="catalog-games-container">
    <h3>Suggestion Games</h3>
    <div class="games-container">
      <GameCard v-for="item in gamesSameCategory" :key="item.id" :item="item" />
    </div>
  </div>

  <div class="catalog-games-container">
    <h3>Recommend Games</h3>
    <div class="games-container">
      <GameCard v-for="item in gamesSameTag" :key="item.id" :item="item" />
    </div>
  </div>

  <div class="description-area" v-html="game.description"></div>
  <div class="input-container input-location">
    <a
      :href="`/games-fullscreen/${props.game?.slug}`"
      target="_blank"
      class="xg-button"
      style="width: 100%"
    >
      Open Game In New Tab
      <IconArrowUpRightFromSquare class="w-3 h-3 ml-2 mb-1" />
    </a>
  </div>
  <div v-if="comments" class="my-10">
    <h3 class="mb-4 border-b border-b-gray-200 pb-2">
      {{ comments.length }} Comments
    </h3>
    <div v-if="userStore.isLoggedIn" class="flex mb-4">
      <div class="user w-10 h-10 mr-4">
        <img
          v-if="userStore.user && userStore.user.avatar"
          class="rounded-full shadow object-contain"
          :src="BACKEND_URL + userStore.user.avatar"
          alt=""
        />
        <UserCircleIcon v-else class="w-10 h-10 fill-gray-400" />
      </div>
      <div class="grow">
        <form @submit.prevent="addComment">
          <p class="font-medium mb-1">{{ userStore.user.name }}</p>
          <div class="flex mb-3 gap-1">
            <StarIcon
              v-for="index in 5"
              :key="index"
              class="w-5 h-5 stroke-yellow-400 hover:fill-yellow-400"
              :class="{
                'fill-yellow-400': rating >= index,
              }"
              @click="changeStarRate(index)"
              @mouseover="changeStarRate(index)"
            />
          </div>
          <FormTextArea
            v-model="commentText"
            placeholder="Enter your rating"
            type="text"
          />
          <span v-if="commentError" class="text-xs text-red-500">
            {{ commentError }}
          </span>
          <div class="flex justify-end mt-2">
            <button
              type="submit"
              class="flex items-center text-xs p-2 border border-gray-400 rounded hover:bg-gray-400 hover:text-white transition-all"
            >
              Comment <PencilIcon class="w-3 h-3 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
    <GameComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<style lang="scss" scoped>
.description-area {
  border: 0.5px solid #000;
  border-radius: 3px;
  color: #000;
  font-size: 15px;
  padding: 16px;

  > p {
    margin: auto;
    padding: 5px 10px;
  }
}

.input-container {
  align-items: center;
  border-bottom: 1px solid #dedede;
  display: flex;
  padding: 0 0.9375rem 0.9375rem;

  input {
    display: none;

    &:focus {
      outline: none;
    }
  }

  label {
    display: none;
  }

  .xg-button {
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: #fff;
    }
  }
}

.input-container.input-embed {
  display: none;
}

.catalog-games-container {
  padding-bottom: 1.25rem;

  h3 {
    border-bottom: 0;
    border-top: 1px solid #dedede;
    color: #44a5ab;
    font-size: 1.5rem;
    margin: 1.25rem 0;
    padding: 0.4rem 0.2rem;
    text-shadow: 0 0 0 transparent;
    font-family: 'Squada One', cursive;

    &:first-of-type {
      margin-top: 0;
    }
  }

  > div {
    padding: 1.25rem 1.25rem 0;

    &:first-of-type {
      padding-top: 0;
    }
  }

  .games-container {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    margin: -0.9375rem -0.9375rem 0 0;

    .game {
      width: calc(100% / 7);
    }
  }

  .button-container {
    box-sizing: border-box;
    padding: 1.25rem;
    text-align: center;
    width: 100%;
  }
}

@media (max-width: 540px) {
  .description-area {
    > p {
      display: none;
    }
  }
}

@media (min-width: 640px) {
  .tools-container {
    padding: 0 0 1.364rem;

    form {
      margin-left: 0.6818rem;
      max-width: 100%;
    }
  }

  .input-container {
    input {
      color: #000;
      display: inline-block;
      flex: 1;
      font-size: 1rem;
      margin: 0 0.6818rem;
      padding: 0.313rem 0.6818rem;
    }

    label {
      display: inline-block;
    }

    .xg-button {
      font-size: 0.75rem;
      height: 35px;
      line-height: 35px;
      padding-bottom: 0;
      padding-top: 0;
      width: auto;
    }
  }

  .input-container.input-location {
    border-bottom: 0;
  }

  .input-container.input-embed {
    display: flex;
  }

  .catalog-games-container {
    h3 {
      margin: 1.364rem 0;
    }

    > div {
      padding: 1.364rem 1.364rem 0;
    }

    .games-container {
      margin: -0.6818rem;
    }

    .button-container {
      padding: 1.364rem;
    }
  }
}

@media (min-width: 1025px) {
  .columns {
    display: flex;

    .column {
      flex: 1;
      margin: 1.364rem;

      &:last-of-type {
        margin: 1.364rem;
        max-width: 350px;
      }
    }
  }

  .game-container {
    margin: 1.364rem 0;
  }

  .input-container {
    border-top: 1px solid #dedede;
    padding: 0.6818rem;
  }
}
</style>
