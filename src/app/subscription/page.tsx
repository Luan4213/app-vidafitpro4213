'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Dumbbell, 
  Check, 
  CreditCard, 
  Smartphone, 
  Shield, 
  Zap,
  Apple,
  Droplets,
  Trophy,
  Camera,
  Bell,
  TrendingUp,
  Users,
  Sparkles,
  Lock
} from 'lucide-react';
import { formatCurrency } from '@/lib/calculations';
import type { PaymentMethod } from '@/lib/types';

export default function SubscriptionPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subscriptionPrice = 29.90;

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Salvar assinatura
    localStorage.setItem('subscriptionActive', 'true');
    localStorage.setItem('subscriptionDate', new Date().toISOString());
    
    setIsProcessing(false);
    router.push('/dashboard');
  };

  const features = [
    { icon: Dumbbell, text: 'Treinos personalizados com IA', color: 'from-emerald-500 to-green-600' },
    { icon: Apple, text: 'Dieta inteligente e adaptativa', color: 'from-orange-500 to-red-600' },
    { icon: Droplets, text: 'Lembretes de hidratação automáticos', color: 'from-cyan-500 to-blue-600' },
    { icon: Camera, text: 'Registro de progresso com fotos', color: 'from-purple-500 to-pink-600' },
    { icon: Trophy, text: 'Gamificação e conquistas', color: 'from-yellow-500 to-orange-600' },
    { icon: Bell, text: 'Notificações personalizadas', color: 'from-indigo-500 to-purple-600' },
    { icon: TrendingUp, text: 'Análise de evolução diária', color: 'from-green-500 to-emerald-600' },
    { icon: Users, text: 'Compartilhamento social', color: 'from-pink-500 to-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-3 rounded-2xl shadow-xl">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              VidaFitPro
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Escolha seu Plano
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Transforme sua saúde com tecnologia de ponta
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Details */}
          <div>
            <Card className="shadow-2xl border-0 mb-6 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">Plano Mensal</CardTitle>
                    <CardDescription className="text-emerald-50 text-base">
                      Acesso completo a todas as funcionalidades
                    </CardDescription>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-bold text-sm">POPULAR</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <div className="text-center mb-8 pb-8 border-b">
                  <div className="text-6xl font-bold text-gray-900 mb-2">
                    {formatCurrency(subscriptionPrice)}
                  </div>
                  <p className="text-gray-600 text-lg">por mês</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm text-emerald-600 font-semibold">
                      Renovação automática • Cancele quando quiser
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">O que está incluído:</h3>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-900 text-base mb-1">Garantia de Satisfação</p>
                      <p className="text-sm text-emerald-700 leading-relaxed">
                        7 dias para testar. Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Forma de Pagamento
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Escolha como deseja pagar sua assinatura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-8 pb-8">
                {/* Payment Method Selection */}
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                  className="space-y-4"
                >
                  <div 
                    className={`flex items-center space-x-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === 'pix' 
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                    onClick={() => setPaymentMethod('pix')}
                  >
                    <RadioGroupItem value="pix" id="pix" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="pix" className="text-lg font-bold cursor-pointer text-gray-900">
                          Pix
                        </Label>
                        <p className="text-sm text-gray-600">Aprovação instantânea</p>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">RÁPIDO</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center space-x-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === 'credit_card' 
                        ? 'border-emerald-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                    onClick={() => setPaymentMethod('credit_card')}
                  >
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="credit_card" className="text-lg font-bold cursor-pointer text-gray-900">
                          Cartão de Crédito
                        </Label>
                        <p className="text-sm text-gray-600">Renovação automática</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {/* Pix Instructions */}
                {paymentMethod === 'pix' && (
                  <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Como pagar com Pix:
                    </h4>
                    <ol className="text-sm text-emerald-700 space-y-2 list-decimal list-inside">
                      <li className="font-medium">Clique em "Assinar Agora"</li>
                      <li className="font-medium">Escaneie o QR Code com seu banco</li>
                      <li className="font-medium">Confirme o pagamento de {formatCurrency(subscriptionPrice)}</li>
                      <li className="font-medium">Acesso liberado instantaneamente ⚡</li>
                    </ol>
                  </div>
                )}

                {/* Credit Card Form */}
                {paymentMethod === 'credit_card' && (
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="cardNumber" className="text-base font-semibold">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        maxLength={19}
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-base font-semibold">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        placeholder="Como está no cartão"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-base font-semibold">Validade</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          maxLength={5}
                          className="mt-2 h-12 text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-base font-semibold">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          maxLength={4}
                          type="password"
                          className="mt-2 h-12 text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Subscribe Button */}
                <Button
                  size="lg"
                  onClick={handleSubscribe}
                  disabled={isProcessing || (paymentMethod === 'credit_card' && (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv))}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white text-lg py-7 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                      Processando pagamento...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 w-6 h-6" />
                      Assinar Agora - {formatCurrency(subscriptionPrice)}
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Dados criptografados</span>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500 leading-relaxed pt-2">
                  Ao assinar, você concorda com nossos Termos de Uso e Política de Privacidade.
                  Você pode cancelar a qualquer momento sem multas ou taxas adicionais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
