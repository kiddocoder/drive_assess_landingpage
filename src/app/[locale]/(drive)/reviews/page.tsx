"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import ReviewForm from "@/components/ReviewForm";

export default function ReviewModalPage() {
    const router = useRouter();

    return (
        <Modal onClose={() => router.back()}>
            <ReviewForm />
        </Modal>
    );
}
