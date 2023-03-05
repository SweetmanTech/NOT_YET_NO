import { Contract } from "ethers"
import abi from "@lib/abi/abi-DCNT721A.json"
import { ipfsImage } from "./helpers"
import axios from "axios"
import getErc721Drop from "./getErc721Drop"

const getCollectionDCNT721A = async (contractAddress: string, provider: any) => {
    console.log("contractAddress", contractAddress)
    console.log("provider", provider)
    const contract = new Contract(contractAddress, abi, provider)
    const baseURI = await contract.baseURI();
    console.log("baseURI", baseURI)
    const metadataURI = ipfsImage(baseURI)
    const { data: metadata } = await axios.get(metadataURI)
    console.log("metadata", metadata)

    const price = await contract.tokenPrice()
    const maxSalePurchasePerAddress = await contract.maxTokenPurchase()
    const totalSupply = await contract.totalSupply()
    const maxSupply = await contract.MAX_TOKENS();
    const publicSaleStart = await contract.saleStart()
    const publicSaleEnd = await contract.saleEnd()
    const dropParams = {
        contractAddress,
        metadata,
        price,
        maxSalePurchasePerAddress,
        totalSupply,
        maxSupply,
        publicSaleStart: publicSaleStart.toString(),
        publicSaleEnd: publicSaleEnd.toString()
    }
    const erc721Drop = getErc721Drop(dropParams)
    return erc721Drop
}

export default getCollectionDCNT721A