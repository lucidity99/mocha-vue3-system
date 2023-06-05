<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    let items = ref([
      { id: 1, text: 'mocha' },
      { id: 2, text: 'yy' }
    ])

    return () => (
      <div class="m-4">
        <ul>
          {items.value.map(({ id, text }) => {
            return <li key={id}>{text}</li>
          })}
        </ul>
      </div>
    )
  }
})
</script>
