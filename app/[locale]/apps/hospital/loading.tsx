import { css, LoadingWorkspace } from "@/components/hospital/ui";

export default function HospitalLoading() {
  return (
    <main className={css.hospital}>
      <LoadingWorkspace />
    </main>
  );
}
