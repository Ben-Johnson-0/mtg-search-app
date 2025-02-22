export default function Card({ img, name }: { img:string, name:string }) {
    return (
        <img src={img} alt={name} className="rounded-[21px]" />
    );
}
