import { useState } from 'react';
import { Flame, MessageSquare, Image, BookOpen, ArrowLeft, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { User as UserType } from '@/types';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface MemorialPageProps {
  user: UserType | null;
  memorialId: string | null;
}

const offeringOptions = {
  flowers: [
    { id: '1', name: '장미', emoji: '🌹' },
    { id: '2', name: '백합', emoji: '🌺' },
    { id: '3', name: '국화', emoji: '🌼' },
    { id: '4', name: '튤립', emoji: '🌷' },
  ],
  incense: [
    { id: '1', name: '백단향', emoji: '🪔' },
    { id: '2', name: '침향', emoji: '🔥' },
  ],
};

export function MemorialPage({ user, memorialId }: MemorialPageProps) {
  const [tributeText, setTributeText] = useState('');
  const [tributeVisibility, setTributeVisibility] = useState<'public' | 'private'>('public');
  const [tributes, setTributes] = useState([
    {
      id: '1',
      author: '이영희',
      content: '항상 따뜻한 미소로 맞아주시던 모습이 생각납니다. 고인의 명복을 빕니다.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPublic: true,
    },
    {
      id: '2',
      author: '박민수',
      content: '좋은 분이셨습니다. 하늘에서 편히 쉬시길 바랍니다.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isPublic: true,
    },
  ]);

  const navigate = useNavigate();

  // Mock memorial data - in real app, this would be fetched based on memorialId
  const memorialData = {
    '1': {
      id: '1',
      name: '김철수',
      birthDate: '1945.03.15',
      deathDate: '2024.08.20',
      age: 79,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      biography: '평생을 교육자로 살아오신 고인께서는 수많은 제자들에게 사랑받으셨으며, 항상 웃음을 잃지 않으시던 분이셨습니다.',
      location: '서울추모공원 A동 101호',
      visibility: 'public' as const,
      members: [] as string[],
    },
    '3': {
      id: '3',
      name: '박민수',
      birthDate: '1960.11.30',
      deathDate: '2024.10.01',
      age: 63,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      biography: '평생을 가족과 함께 보낸 따뜻한 분이셨습니다.',
      location: '서울추모공원 A동 303호',
      visibility: 'private' as const,
      members: ['user-1', 'user-2'],
    },
  };

  const memorial = memorialData[memorialId as keyof typeof memorialData] || memorialData['1'];
  
  // Check if user has access to private memorial
  const hasAccess = memorial.visibility === 'public' || 
    (memorial.visibility === 'private' && user && memorial.members.includes(user.id.toString()));

  const handleOffering = (item: Record<string, string>) => {
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }
    toast.success(`${item.name}를 헌화하였습니다`);
  };

  const handleSubmitTribute = () => {
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }
    if (!tributeText.trim()) {
      toast.error('추모글을 입력해주세요');
      return;
    }

    const newTribute = {
      id: Date.now().toString(),
      author: user.name,
      content: tributeText,
      timestamp: new Date(),
      isPublic: tributeVisibility === 'public',
    };

    setTributes([newTribute, ...tributes]);
    setTributeText('');
    toast.success('추모글이 등록되었습니다');
  };

  // If no access to private memorial, show restricted view
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/search')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            검색으로 돌아가기
          </Button>

          <div className="max-w-2xl mx-auto mt-12">
            <Card className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl mb-4">비공개 추모관입니다</h2>
                <p className="text-gray-600 mb-6">
                  이 추모관은 가족 그룹 멤버만 접근할 수 있습니다.<br />
                  추모관 관리자에게 초대를 요청하시거나 로그인 후 다시 시도해주세요.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => navigate('/search')}>
                    검색으로 돌아가기
                  </Button>
                  {!user && (
                    <Button onClick={() => navigate('/login')}>
                      로그인
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/search')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          검색으로 돌아가기
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Memorial Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden sticky top-24">
              <div className="aspect-square relative overflow-hidden bg-gray-200">
                <img 
                  src={memorial.image} 
                  alt={memorial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-2">
                  {memorial.visibility === 'public' ? (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Globe className="w-3 h-3 mr-1" />
                      공개
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      <Lock className="w-3 h-3 mr-1" />
                      비공개
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl text-center mb-4">{memorial.name}</h1>
                <div className="space-y-2 text-center text-gray-600 mb-6">
                  <p>{memorial.birthDate} ~ {memorial.deathDate}</p>
                  <p>향년 {memorial.age}세</p>
                  <p className="text-sm">{memorial.location}</p>
                </div>

                {/* Quick Offerings */}
                <div className="border-t pt-6">
                  <h3 className="mb-4 text-center">온라인 성묘</h3>
                  
                  <div className="mb-4">
                    <Label className="text-sm text-gray-600 mb-2 block">헌화</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {offeringOptions.flowers.map(flower => (
                        <button
                          key={flower.id}
                          onClick={() => handleOffering(flower)}
                          className="aspect-square border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition-colors text-2xl"
                          title={flower.name}
                        >
                          {flower.emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-sm text-gray-600 mb-2 block">분향</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {offeringOptions.incense.map(incense => (
                        <button
                          key={incense.id}
                          onClick={() => handleOffering(incense)}
                          className="py-3 border-2 border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:border-purple-500 hover:bg-purple-50 transition-colors"
                        >
                          <span className="text-xl">{incense.emoji}</span>
                          <span className="text-sm">{incense.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleOffering({ id: '1', name: '헌촛' })}
                  >
                    <Flame className="w-4 h-4 mr-2" />
                    헌촛
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tributes" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="tributes">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  추모글
                </TabsTrigger>
                <TabsTrigger value="biography">
                  <BookOpen className="w-4 h-4 mr-2" />
                  생애 기록
                </TabsTrigger>
                <TabsTrigger value="album">
                  <Image className="w-4 h-4 mr-2" />
                  추모 앨범
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tributes">
                {/* Write Tribute */}
                {user && (
                  <Card className="p-6 mb-6">
                    <h3 className="mb-4">추모글 작성</h3>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="고인을 추모하는 글을 남겨주세요..."
                        value={tributeText}
                        onChange={(e) => setTributeText(e.target.value)}
                        rows={4}
                      />
                      <div className="flex items-center justify-between">
                        <Select value={tributeVisibility} onValueChange={(value: 'public' | 'private') => setTributeVisibility(value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                공개
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                비공개
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={handleSubmitTribute}>
                          추모글 남기기
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Tributes List */}
                <div className="space-y-4">
                  {tributes.map(tribute => (
                    <Card key={tribute.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{tribute.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span>{tribute.author}</span>
                            {!tribute.isPublic && (
                              <Lock className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{tribute.content}</p>
                          <p className="text-sm text-gray-500">
                            {tribute.timestamp.toLocaleDateString('ko-KR')} {tribute.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="biography">
                <Card className="p-6">
                  <h3 className="text-xl mb-4">생애 이야기</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{memorial.biography}</p>
                    
                    <div className="mt-8 space-y-4">
                      <div>
                        <h4 className="text-lg mb-2">주요 경력</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>서울대학교 사범대학 국어교육과 졸업</li>
                          <li>서울고등학교 국어 교사 (1970-2000)</li>
                          <li>교육부 장관 표창 수상 (1995)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg mb-2">가족 관계</h4>
                        <p className="text-gray-600">배우자 이영숙, 자녀 2남 1녀</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="album">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="aspect-square overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400&h=400&fit=crop`}
                        alt={`추억 ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
