export default function Game ({ title, cover, onRemove }) {
    return (
        <div>
            <img src={cover} alt="" />
            <div>
              <h2>{title}</h2>
              {/* Atribuindo a função de remover o game ao botão.
                A função deve ser um callback*/}
              <button onClick={onRemove}>Remover</button>
            </div>
          </div>
    )
}