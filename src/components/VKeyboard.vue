<template>
  <div class="simple-keyboard-wrapper" :class="{ show: isShowKeyboard }">
    <div class="simple-keyboard"></div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { mapGetters } from "vuex";

export default {
  name: "VKeyboard",

  computed: mapGetters({
    isShowKeyboard: "app/isShowKeyboard",
  }),

  mounted() {
    const keyboard = new Keyboard({
      onChange: (input) => this.emitter.emit("keyboard:change", input),
      onKeyPress: (button) => onKeyPress(button),
      theme: "hg-theme-default hg-theme-dark",
    });

    function onKeyPress(button) {
      if (button === "{shift}" || button === "{lock}") handleShift();
    }

    function handleShift() {
      let currentLayout = keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      keyboard.setOptions({ layoutName: shiftToggle });
    }
  },
};
</script>

<style lang="scss" scoped>
.simple-keyboard-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--surface-a);
  z-index: 1100;
  padding: 20px;
  border-top: 1px solid var(--surface-d);
  transform: translateY(100%);
  transition: 0.25s transform linear;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  &.show {
    transform: translateY(0);
  }
}

::v-deep .simple-keyboard {
  max-width: 850px;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  &.hg-theme-dark {
    background-color: var(--surface-b);
    border-radius: 0;
    border-radius: 5px;

    .hg-button {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--surface-a);
      color: var(--text-color);
      box-shadow: 0 0 3px -1px rgba($primary-color, 0.3);
      border-bottom: 1px solid $primary-color;
    }

    .hg-button:active {
      background: $primary-color;
      color: white;
    }
  }
}
</style>