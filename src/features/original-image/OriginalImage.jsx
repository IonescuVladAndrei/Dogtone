import { useAppEdit } from '../app-context/AppContext';
import { ImageOriginType } from '../app-context/imageOriginEnum';
import LocalImage from './sections/local-image/LocalImage';
import RandomBreedImage from './sections/random-image/RandomBreedImage';
import RandomImage from './sections/random-image/RandomImage';

function OriginalImage() {
    const { imageOrigin } = useAppEdit();
    return (
        <>
            {imageOrigin === ImageOriginType.RANDOM ? (
                <RandomImage />
            ) : imageOrigin === ImageOriginType.RANDOM_WITH_BREED ? (
                <RandomBreedImage />
            ) : (
                <LocalImage />
            )}
        </>
    );
}

export default OriginalImage;
