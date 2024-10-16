<script setup>
import { ref } from "vue";
import DOMPurify from "dompurify";

const comment = ref("");
const comments = ref([]);

const submitComment = () => {
  // Sanitasi komentar untuk menghapus semua tag dan atribut HTML
  const sanitizedComment = DOMPurify.sanitize(comment.value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  // Tambahkan komentar yang sudah disanitasi ke dalam array
  comments.value.push(sanitizedComment); // Simpan dalam bentuk array
  comment.value = ""; // Kosongkan input komentar
};
</script>

<template>
  <div>
    <h3>Comments</h3>
    <input v-model="comment" placeholder="Leave a comment" />
    <button @click="submitComment">Submit</button>
    <div>
      <!-- Tampilkan komentar sebagai teks biasa, tanpa elemen HTML -->
      <div v-for="(comment, index) in comments" :key="index">{{ comment }}</div>
    </div>
  </div>
</template>
