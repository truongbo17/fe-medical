import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
  app.component(
    "doctor",
    defineAsyncComponent(() => import("@/layouts/doctor.vue"))
  );
  app.component(
    "patient",
    defineAsyncComponent(() => import("@/layouts/patient.vue"))
  );
  app.component(
    "default",
    defineAsyncComponent(() => import("@/layouts/default.vue"))
  );
}
