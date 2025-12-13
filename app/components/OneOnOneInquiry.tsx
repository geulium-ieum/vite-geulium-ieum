import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';

export default function OneOnOneInquiry() {

    return (
        <div
            className="bg-gray-50 max-w-7xl mx-auto"
        >
            <div 
                className="pt-4 mb-4"
            >
                <h1 
                    className="text-3xl text-gray-900"
                >
                    1:1 문의
                </h1>
            </div>
            <div className="flex flex-col gap-4">
                <Label 
                    htmlFor="inquiry-content"
                    className="text-gray-900 text-2xl"
                >
                    문의 내용
                </Label>
                <Textarea 
                    id="inquiry-content" 
                    placeholder="문의 내용을 입력해주세요."
                    className="text-gray-900 bg-white border-gray-500 rounded-md"
                />
                <div className="flex justify-end gap-4">
                    <Button
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                            등록하기
                     </Button>
                     <Button
                        variant="outline"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                     >
                        취소
                     </Button>
                </div>
            </div>
        </div>
    );
}