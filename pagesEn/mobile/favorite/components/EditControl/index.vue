<template>
  <div class="edit-control">
    <div class="edit-header">
      <div class="selected-list">
        <span>Selected {{ selectedNumber }}</span>
      </div>
      <div class="btn-box">
        <p class="cancel" @click="eventCancel">
          Cancel
        </p>
        <p class="delete" @click="eventDelete">
          Delete
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditControl',
  props: {
    selectedNumber: {
      type: Number,
      default: 0
    }
  },
  methods: {
    eventDelete () {
      this.$emit('delete')
    },
    eventCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>

.edit-control {
  width: 100%;
  height: mvw(88);
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px -2px 4px rgba(85, 85, 85, 0.05);

  .edit-header {
    height: mvw(56);
    display: flex;
    justify-content: space-between;
    padding: mvw(8) mvw(24) mvw(8) mvw(16);
  }
  .selected-list {
    line-height: mvw(40);
    span {
      color: #333;
      font-size: mrem(24);
      font-weight: 600;
    }
  }
  .btn-box {
    display: flex;
    align-items: flex-start;
  }
  p {
    display: inline-block;
    margin-left: mvw(8);
    width: mvw(80);
    height: mvw(40);
    text-align: center;
    line-height: mvw(40);
  }
  .cancel {
    border: mvw(1) solid #ddd;
  }
  .delete {
    background-color: #000;
    color: #fff;
  }
}
</style>
