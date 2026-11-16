import { LoadingWorkspace } from "@/components/medical-college/ui";
import css from "@/components/medical-college/college.module.css";
export default function Loading() {
  return (
    <div className={css.college}>
      <div className={css.wrap}>
        <LoadingWorkspace />
      </div>
    </div>
  );
}
