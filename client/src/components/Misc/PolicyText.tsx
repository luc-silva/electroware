import styles from "./PolicyText.module.css";

export const PolicyText = () => {
    return (
        <div className={styles["policy-text"]}>
            <p>
                A sua privacidade é importante para nós. É política do
                Electroware respeitar a sua privacidade em relação a qualquer
                informação sua que possamos coletar no site{" "}
                <a href="https://electroware">Electroware</a>, e outros sites
                que possuímos e operamos.
            </p>
            <p>
                Solicitamos informações pessoais apenas quando realmente
                precisamos delas para lhe fornecer um serviço. Fazemo-lo por
                meios justos e legais, com o seu conhecimento e consentimento.
                Também informamos por que estamos coletando e como será usado.
            </p>
            <p>
                Apenas retemos as informações coletadas pelo tempo necessário
                para fornecer o serviço solicitado. Quando armazenamos dados,
                protegemos dentro de meios comercialmente aceitáveis ​para
                evitar perdas e roubos, bem como acesso, divulgação, cópia, uso
                ou modificação não autorizados.
            </p>
            <p>
                Não compartilhamos informações de identificação pessoal
                publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
            <p>
                O nosso site pode ter links para sites externos que não são
                operados por nós. Esteja ciente de que não temos controle sobre
                o conteúdo e práticas desses sites e não podemos aceitar
                responsabilidade por suas respectivas&nbsp;
                <a href="https://politicaprivacidade.com/" target="_blank" rel="noreferrer" >
                    políticas de privacidade
                </a>
                .
            </p>
            <p>
                Você é livre para recusar a nossa solicitação de informações
                pessoais, entendendo que talvez não possamos fornecer alguns dos
                serviços desejados.
            </p>
            <p>
                O uso continuado de nosso site será considerado como aceitação
                de nossas práticas em torno de privacidade e informações
                pessoais. Se você tiver alguma dúvida sobre como lidamos com
                dados do usuário e informações pessoais, entre em contacto
                connosco.
            </p>
            <ul>
                <li>
                    O serviço Google AdSense que usamos para veicular
                    publicidade usa um cookie DoubleClick para veicular anúncios
                    mais relevantes em toda a Web e limitar o número de vezes
                    que um determinado anúncio é exibido para você.
                </li>
                <li>
                    Para mais informações sobre o Google AdSense, consulte as
                    FAQs oficiais sobre privacidade do Google AdSense.
                </li>
                <li>
                    Utilizamos anúncios para compensar os custos de
                    funcionamento deste site e fornecer financiamento para
                    futuros desenvolvimentos. Os cookies de publicidade
                    comportamental usados ​​por este site foram projetados para
                    garantir que você forneça os anúncios mais relevantes sempre
                    que possível, rastreando anonimamente seus interesses e
                    apresentando coisas semelhantes que possam ser do seu
                    interesse.
                </li>
                <li>
                    Vários parceiros anunciam em nosso nome e os cookies de
                    rastreamento de afiliados simplesmente nos permitem ver se
                    nossos clientes acessaram o site através de um dos sites de
                    nossos parceiros, para que possamos creditá-los
                    adequadamente e, quando aplicável, permitir que nossos
                    parceiros afiliados ofereçam qualquer promoção que pode
                    fornecê-lo para fazer uma compra.
                </li>
            </ul>
        </div>
    );
};
