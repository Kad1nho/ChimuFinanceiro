export default function PaymentInfo() {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <p><strong>Número:</strong> {process.env.NEXT_PUBLIC_PAYMENT_NUMBER}</p>
      <p><strong>Instruções:</strong> {process.env.NEXT_PUBLIC_PAYMENT_INSTRUCTIONS}</p>
    </div>
  );
}
