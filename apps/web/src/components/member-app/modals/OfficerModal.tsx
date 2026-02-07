import { OfficerPortal } from "../officer-portal/OfficerPortal";

interface OfficerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const OfficerModal = ({ isOpen, onClose }: OfficerModalProps) => {
    if (!isOpen) return null;

    return (
        <OfficerPortal onClose={onClose} />
    );
};

