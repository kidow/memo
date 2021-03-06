import type { FC } from 'react'
import { Modal, Icon } from 'components'

export interface Props extends ModalProps {}

const HelpModal: FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <Modal title="도움말" isOpen={isOpen} onClose={onClose}>
      <Icon.Logo />
      <ul className="mt-4 text-sm list-disc list-inside">
        <li>자유롭게 개인의 메모를 저장할 수 있는 사이트입니다.</li>
        <li>
          <span className="font-bold">LocalStorage</span>를 사용하여, 다른
          컴퓨터에서 데이터를 불러올 수 없습니다.
        </li>
        <li>
          실시간으로 저장하기 때문에 입력 후 창을 새로고침해도 데이터가 날아가지
          않습니다.
        </li>
        <li>
          혹 문의사항이 있다면{' '}
          <a
            target="_blank"
            className="underline"
            href="mailto:wcgo2ling@gmail.com"
            rel="noreferrer"
          >
            wcgo2ling@gmail.com
          </a>
          으로 남겨주시면 감사하겠습니다.
        </li>
      </ul>
    </Modal>
  )
}

export default HelpModal
