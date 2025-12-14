import { Card } from "~/components/ui/card";

export default function Privacy() {
    return (
        <div className="bg-gray-50 max-w-7xl mx-auto">
            <div className="pt-4 mb-4">
                <h1 className="text-3xl text-gray-900 font-bold">
                    개인정보처리방침
                </h1>
            </div>
            <div className="flex flex-col gap-4">
                <Card className="p-6">
                    <h2 className="text-lg font-bold">
                        개인정보처리방침
                    </h2>
                </Card>
            </div>
        </div>
    )
}